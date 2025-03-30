import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, switchMap, timeout } from 'rxjs';
import { HttpMessage } from '@app/http-lib/http-message.dto';
import { HttpResponse } from '@app/http-lib/http-response.dto';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';
import { Task } from '@app/db-lib/task.dto.entity';
import { TaskPayload } from '@app/dto-lib/task/task-payload.dto';
import { DeleteTaskPayload } from '@app/dto-lib/task/delete-task-payload.dto';
import { NestError } from '@app/http-lib/nest-error';

@Controller('api/task')
export class TaskController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
    @Inject('TASK_MICROSERVICE') private readonly taskClient: ClientProxy,
    private readonly httpExceptionHandlerService: HttpExceptionHandlerService,
  ) {}

  private decodeToken(authHeader: string): Observable<string> {
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    return this.userClient
      .send<{ id: string }, string>({ cmd: 'decode_token' }, token)
      .pipe(
        map<{ id: string }, string>((res) => res.id),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }

  @Post()
  createTask(
    @Headers('Authorization') authHeader: string,
    @Body() task: Partial<Task>,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      switchMap((email: string) =>
        this.taskClient
          .send<unknown, TaskPayload>({ cmd: 'create_task' }, { email, task })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: NestError) => {
              console.log(error);
              return this.httpExceptionHandlerService.handle(error);
            }),
          ),
      ),
    );
  }

  @Post('/steps')
  createStep(
    @Headers('Authorization') authHeader: string,
    @Body() task: Partial<Task>,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      switchMap((email: string) =>
        this.taskClient
          .send<unknown, TaskPayload>({ cmd: 'create_step' }, { email, task })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: NestError) => {
              console.log(error);
              return this.httpExceptionHandlerService.handle(error);
            }),
          ),
      ),
    );
  }

  @Put()
  update(
    @Headers('Authorization') authHeader: string,
    @Body() task: Partial<Task>,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      switchMap((email: string) =>
        this.taskClient
          .send<unknown, TaskPayload>({ cmd: 'update_task' }, { email, task })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: NestError) =>
              this.httpExceptionHandlerService.handle(error),
            ),
          ),
      ),
    );
  }

  @Delete('/:id')
  delete(
    @Headers('Authorization') authHeader: string,
    @Param('id') id: number,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      switchMap((email: string) =>
        this.taskClient
          .send<
            unknown,
            DeleteTaskPayload
          >({ cmd: 'delete_task' }, { email, id })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: NestError) =>
              this.httpExceptionHandlerService.handle(error),
            ),
          ),
      ),
    );
  }

  @Get('all')
  getAll(
    @Headers('Authorization') authHeader: string,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      timeout(5000),
      switchMap((email: string) =>
        this.taskClient.send<unknown, string>({ cmd: 'get_tasks' }, email).pipe(
          map((res) => new HttpResponse(res)),
          catchError((error: NestError) => {
            return this.httpExceptionHandlerService.handle(error);
          }),
        ),
      ),
    );
  }
}
