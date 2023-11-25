
import { MatPaginatorIntl } from '@angular/material/paginator';

export class PaginatorI18n extends MatPaginatorIntl {

  //translate: TranslateService;


  injectTranslateService() {
    //this.translate = translate;

    /* this.translate.onLangChange.subscribe(() => {
        this.translateLabels();
    }); */

    this.translateLabels();
  }

  translateLabels() {
    /*super.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE_LABEL');
    super.nextPageLabel = this.translate.instant('NEXT_PAGE_LABEL');
    super.previousPageLabel = this.translate.instant('PREVIOUS_PAGE_LABEL');
    super.firstPageLabel = this.translate.instant('FIRST_PAGE_LABEL');
    super.lastPageLabel = this.translate.instant('LAST_PAGE_LABEL');
    this.changes.next();*/
  }


  override getRangeLabel = function (page: any, pageSize: any, length: any) {
    const of =  'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };
}
