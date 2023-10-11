import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18n, I18nContext } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
  constructor(private readonly i18nService: I18nService) {}

  translate(key): string {
    const lang = I18nContext.current().lang;
    const translation = this.i18nService.translate(key, {
      lang,
    }) as string;
    return translation;
  }
}
