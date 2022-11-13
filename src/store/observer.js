let currentObserver = null;

// 상태 바뀌는거 보는애
export const observe = (fn) => {
	currentObserver = fn;
	fn();
	currentObserver = null;
};

// 발행기관?
// observe가 보면 그니까 url 상태 바뀌는걸 observe가 보면
export const observable = (obj) => {
	Object.keys(obj).forEach((key) => {
		let _value = obj[key];
		const observers = new Set();

		Object.defineProperty(obj, key, {
			get() {
				if (currentObserver) observers.add(currentObserver);
				return _value;
			},
			set(value) {
				_value = value;
				observers.forEach((fn) => fn());
			},
		});
	});
	return obj;
};

// export const state = observable({ postId: "/" });
// observe(() => console.log(`상태 : ${postId}`));
// state.postId = 456;
