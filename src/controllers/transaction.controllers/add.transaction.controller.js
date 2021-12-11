const { TransactionService, UserService } = require("../../services");
const { isErrorOrFalsyValue } = require("../../helpers");
const { TransactionDTO } = require("../../DTO");

const add = async (req, res, next) => {
	const transaction = await TransactionService.add(req.body);

	if (isErrorOrFalsyValue(transaction)) {
		return next(transaction);
	}

	const data = TransactionDTO.getTransactionInfo(transaction);
	const balance = await UserService.changeBalance(data.transaction);

	res.status(201).json({ message: "success", data: { ...data, balance } });
};

module.exports = { add };
