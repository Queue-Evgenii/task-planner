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
import { catchError, map, Observable, switchMap } from 'rxjs';
import { HttpMessage } from '@app/http-lib/http-message.dto';
import { HttpError } from '@app/http-lib/http-error.dto';
import { HttpResponse } from '@app/http-lib/http-response.dto';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';
import { Task } from '@app/db-lib/task.dto.entity';
import { TaskPayload } from '@app/dto-lib/task/task-payload.dto';
import { DeleteTaskPayload } from '@app/dto-lib/task/delete-task-payload.dto';

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
      .send<string, string>({ cmd: 'decode_token' }, token)
      .pipe(
        catchError((error: HttpError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }

  @Post()
  create(
    @Headers('Authorization') authHeader: string,
    @Body() task: Partial<Task>,
  ): Observable<HttpMessage> {
    return this.decodeToken(authHeader).pipe(
      switchMap((email: string) =>
        this.taskClient
          .send<unknown, TaskPayload>({ cmd: 'create_task' }, { email, task })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: HttpError) =>
              this.httpExceptionHandlerService.handle(error),
            ),
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
            catchError((error: HttpError) =>
              this.httpExceptionHandlerService.handle(error),
            ),
          ),
      ),
    );
  }

  @Delete(':id')
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
          >({ cmd: 'update_task' }, { email, id })
          .pipe(
            map((res) => new HttpResponse(res)),
            catchError((error: HttpError) =>
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
      switchMap((email: string) =>
        this.taskClient.send<unknown, string>({ cmd: 'get_tasks' }, email).pipe(
          map((res) => new HttpResponse(res)),
          catchError((error: HttpError) =>
            this.httpExceptionHandlerService.handle(error),
          ),
        ),
      ),
    );
  }
}
