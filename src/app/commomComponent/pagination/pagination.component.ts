import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() total = 0;
  @Input() paginationPageSizes= [10, 20, 30];
  @Input() pageSize = 0;
  @Input() pageIndex = 1;
  @Output() pageIndexChange = new EventEmitter<any>();
  pageTotal=0;
  // paginationPageSizes: [10, 20, 30];
  totalPage = 0;
  constructor() {
     
   }

  //跳转第一页
  skipFirst() {
    if (this.pageIndex !== 1) {
      this.pageIndex = 1;
      this.onPageIndexChange(1);
    }
  }
  //最后一页
  skipLast() {
   const last = Math.max(this.getTotalPage(), 1);
   if (this.pageIndex !== last) {
      this.pageIndex = last;
      this.onPageIndexChange(last);
    }
  }

  //上一页
  skipPrev() {
    if (this.hasPrev()) {
      this.pageIndex = this.pageIndex - 1; 
      this.onPageIndexChange(this.pageIndex);
    }
  }


  //下一页
  skipNext() {
     if (this.hasNext()) {
       this.pageIndex = this.pageIndex + 1; 
      this.onPageIndexChange(this.pageIndex);
    }
  }


  //一页显示多少行
  skipCount() {
    if (this.pageIndex > this.getTotalPage()) {
      this.pageIndex = 1;
    }
    this.onPageIndexChange(this.pageIndex);
  }

  changePageSize() {
    this.getTotalPage();
    this.pageIndex = 1;
    this.onPageIndexChange(1);
  }
  
  onPageIndexChange(pageIndex: number) {
    // if (this.pageIndex !== pageIndex) {
    // }
    this.getTotalPage();
    this.pageIndexChange.emit({
        pageIndex:(pageIndex-1)*this.pageSize,
        pageSize:Number(this.pageSize)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.pageSize = this.paginationPageSizes[0];
      this.totalPage = this.getTotalPage();
      this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
  }



  //获取总页数
  getTotalPage(): number {
    
    //总条数/当前页显示条数=总页数
    this.pageTotal = Math.ceil(this.total / this.pageSize);
    return Math.ceil(this.total / this.pageSize);
  }

  hasNext(): boolean {
    return this.pageIndex < this.totalPage;
  }
  hasPrev(): boolean {
    return this.pageIndex > 1;
  }


}
