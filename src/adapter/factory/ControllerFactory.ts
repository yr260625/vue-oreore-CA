export abstract class ControllerFactory<
  INFRASTRUCTURE,
  GATEWAY,
  VIEW,
  PRESENTER,
  USECASE,
  CONTROLLER
> {
  // DI
  create(): CONTROLLER {
    const infrastructure: INFRASTRUCTURE = this.getInfrastructure();
    const gateway: GATEWAY = this.getGateway(infrastructure);
    const viewState: VIEW = this.getView();
    const presenter: PRESENTER = this.getPresenter(viewState);
    const usecase: USECASE = this.getUsecase(gateway, presenter);
    return this.getController(usecase);
  }

  // Implemented in subclasses
  protected abstract getInfrastructure(): INFRASTRUCTURE;
  protected abstract getGateway(infrastructure: INFRASTRUCTURE): GATEWAY;
  protected abstract getView(): VIEW;
  protected abstract getPresenter(state: VIEW): PRESENTER;
  protected abstract getUsecase(
    gateway: GATEWAY,
    presenter: PRESENTER
  ): USECASE;
  protected abstract getController(usecase: USECASE): CONTROLLER;
}
