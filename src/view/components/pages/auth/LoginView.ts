import { LoginViewModel } from "src/adapter/auth/interfaces/LoginViewModel";
import { ILoginView } from "src/view/components/interfaces/LoginView";

// each method will update reactive state in vue components
export class LoginView implements ILoginView {
  constructor(readonly loginViewModel: LoginViewModel) {}
}
