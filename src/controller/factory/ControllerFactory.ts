export abstract class ControllerFactory<
  INFRASTRUCTURE,
  GATEWAY,
  VIEWSTATE,
  PRESENTER,
  USECASE,
  CONTROLLER
> {
  // DI
  create(): CONTROLLER {
    const infrastructure: INFRASTRUCTURE = this.getInfrastructure();
    const gateway: GATEWAY = this.getGateway(infrastructure);
    const viewState: VIEWSTATE = this.getViewState();
    const presenter: PRESENTER = this.getPresenter(viewState);
    const usecase: USECASE = this.getUsecase(gateway, presenter);
    return this.getController(usecase);
  }

  // Implemented in subclasses
  protected abstract getInfrastructure(): INFRASTRUCTURE;
  protected abstract getGateway(infrastructure: INFRASTRUCTURE): GATEWAY;
  protected abstract getViewState(): VIEWSTATE;
  protected abstract getPresenter(state: VIEWSTATE): PRESENTER;
  protected abstract getUsecase(
    gateway: GATEWAY,
    presenter: PRESENTER
  ): USECASE;
  protected abstract getController(usecase: USECASE): CONTROLLER;
}
