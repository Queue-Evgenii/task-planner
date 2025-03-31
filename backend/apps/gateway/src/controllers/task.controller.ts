import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { HttpMessage } from '@app/http-lib/http-message.dto';
import { HttpResponse } from '@app/http-lib/http-response.dto';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';
import { Task } from '@app/db-lib/task.dto.entity';
import { TaskPayload } from '@app/dto-lib/task/task-payload.dto';
import { DeleteTaskPayload } from '@app/dto-lib/task/delete-task-payload.dto';
import { NestError } from '@app/http-lib/nest-error';
import { AuthenticatedRequest, AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/task')
export class TaskController {
  constructor(
    @Inject('TASK_MICROSERVICE') private readonly taskClient: ClientProxy,
    private readonly httpExceptionHandlerService: HttpExceptionHandlerService,
  ) {}

  @Post()
  createTask(
    @Body() task: Partial<Task>,
    @Request() req: AuthenticatedRequest,
  ): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.taskClient
      .send<unknown, TaskPayload>({ cmd: 'create_task' }, { email, task })
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) => {
          console.log(error);
          return this.httpExceptionHandlerService.handle(error);
        }),
      );
  }

  @Post('/steps')
  createStep(
    @Body() task: Partial<Task>,
    @Request() req: AuthenticatedRequest,
  ): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.taskClient
      .send<unknown, TaskPayload>({ cmd: 'create_step' }, { email, task })
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) => {
          console.log(error);
          return this.httpExceptionHandlerService.handle(error);
        }),
      );
  }

  @Put()
  update(
    @Body() task: Partial<Task>,
    @Request() req: AuthenticatedRequest,
  ): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.taskClient
      .send<unknown, TaskPayload>({ cmd: 'update_task' }, { email, task })
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }

  @Delete('/:id')
  delete(
    @Param('id') id: number,
    @Request() req: AuthenticatedRequest,
  ): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.taskClient
      .send<unknown, DeleteTaskPayload>({ cmd: 'delete_task' }, { email, id })
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }

  @Get('all')
  getAll(@Request() req: AuthenticatedRequest): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.taskClient
      .send<unknown, string>({ cmd: 'get_tasks' }, email)
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) => {
          return this.httpExceptionHandlerService.handle(error);
        }),
      );
  }
}
