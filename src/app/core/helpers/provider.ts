import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductInterceptor } from "../interceptors/product.interceptor";

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true },
];
