import { Container } from 'inversify';

import { HttpClient } from './http';
import { CustomerService } from './customer';
import { SlotService } from './slot';
import { UserService } from './user';
import { AuthService } from './auth';

export const dependencyContainer = new Container();

dependencyContainer.bind<HttpClient>("HttpClient").to(HttpClient).inSingletonScope();
dependencyContainer.bind<AuthService>("AuthService").to(AuthService).inSingletonScope();
dependencyContainer.bind<CustomerService>("CustomerService").to(CustomerService).inSingletonScope();
dependencyContainer.bind<SlotService>("SlotService").to(SlotService).inSingletonScope();
dependencyContainer.bind<UserService>("UserService").to(UserService).inSingletonScope();