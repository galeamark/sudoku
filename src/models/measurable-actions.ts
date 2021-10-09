import { performance } from 'perf_hooks';

export class MeasurableActions {
	private _monitoredActions: { [key: string]: number[] } = {};
	private _titles: string[] = [];

	public measureAction<T>(title: string, callback: () => T): T {
		if (!this._monitoredActions[title]) {
			this._monitoredActions[title] = [];
			this._titles.push(title);
		}
		const start = performance.now();
		const result = callback();
		const end = performance.now();
		this._monitoredActions[title].push(end - start);
		return result;
	}

	public getActionsSummary() {
		for (const title of this._titles) {
			console.log(
				title,
				this._monitoredActions[title].length,
				this._monitoredActions[title].reduce((a, b) => a + b),
				this._monitoredActions[title].reduce((a, b) => a + b) / this._monitoredActions[title].length,
			);
		}
	}
}
