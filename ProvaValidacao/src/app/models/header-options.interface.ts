import { HttpHeaders } from '@angular/common/http';

export interface HeadersOptions {
	useAuthorizationHeader: boolean;
	overrideAuthorizationToken?: string;
	customHeaders: HttpHeaders;
}
