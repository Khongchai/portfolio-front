export class Paginator {
  readonly limit: number;
  current: number;
  skip: number;
  array: any[];
  constructor(array: any[], limit: number, skip?: number) {
    this.limit = limit;
    this.array = array;
    this.skip = skip ? skip : 0;
    this.current = 0 + skip;
  }

  getItemsAtCurrent() {
    const data = this.array.slice(this.current, this.current + this.limit);
    return this.checkZeroReturn(data);
  }

  paginateForward() {
    this.current = this.current + this.limit;

    const data = this.array.slice(this.current, this.current + this.limit);
    return this.checkZeroReturn(data);
  }

  paginateBackward() {
    this.current = this.current - this.limit;

    const data = this.array.slice(this.current, this.current + this.limit);
    return this.checkZeroReturn(data);
  }

  getPagePosition() {
    const length = this.array.length;
    const totalPages = Math.ceil(length / this.limit);
    const currentPage = Math.ceil((this.current + 1) / this.limit);
    return {
      page: currentPage === 0 ? 1 : currentPage,
      of: totalPages,
    };
  }

  getAllItems() {
    return this.array;
  }

  private checkFirstAndLast(data: any) {
    return {
      isFirst: this.current === 0,
      isLast: data.length < this.limit,
    };
  }

  /**
   * If returns 0, something is wrong, because pagination should always return soemthing
   */
  private checkZeroReturn(data: any[]) {
    if (data.length < 0) {
      console.error("Pagination position is less than 0");
    }
    return {
      data,
      ...this.checkFirstAndLast(data),
    };
  }
}
