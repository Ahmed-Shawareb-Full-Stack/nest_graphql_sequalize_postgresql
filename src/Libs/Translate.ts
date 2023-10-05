import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18n, I18nContext } from 'nestjs-i18n';

@Injectable()
export class TranslateService {
  constructor(private readonly i18nService: I18nService) {}

  async translate(key: string, language: string) {
    const translation = await this.i18nService.translate(key, {
      lang: language,
    });
    return translation;
  }
}
