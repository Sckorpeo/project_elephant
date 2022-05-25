export default function (func) {
	function catchAsync(req, res, next) {
		return func(req, res, next).catch(next);
	}
	return catchAsync(func);
}