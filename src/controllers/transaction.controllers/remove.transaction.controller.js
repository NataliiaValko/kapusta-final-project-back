const { TransactionService, UserService } = require("../../services");
const { isErrorOrFalsyValue } = require("../../helpers");
const { TransactionDTO } = require("../../DTO");

const remove = async (req, res, next) => {
	const transaction = await TransactionService.remove(req.params, req.body);

	if (isErrorOrFalsyValue(transaction)) {
		return next(transaction);
	}

	const balance = await UserService.changeBalance(transaction, true);

	res.status(200).json({ message: "success", data: { balance } });
};

module.exports = { remove };
