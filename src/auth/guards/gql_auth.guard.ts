import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import SerializeGQLInput from '../../Libs/serializeGQL';

@Injectable()
export class GQLAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const CTX = GqlExecutionContext.create(context);
    const request = CTX.getContext();
    request.body = SerializeGQLInput(CTX.getArgs().loginUserInput);
    return request;
  }
}
