import { ParallelAction } from './ParallelAction';

export class ParallelRaceAction extends ParallelAction {
    protected onActionCallback(): void {
        this.onTerminate();
        super.onActionCallback();
    }
}