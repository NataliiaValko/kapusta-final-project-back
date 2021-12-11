const { Transaction } = require("../../model");

const remove = async ({ transactionId }, { user: { _id } }) => {
	try {
		return await Transaction.findOneAndDelete({
			owner: _id,
			_id: transactionId,
		}).populate("owner", "email");
	} catch (error) {
		return error;
	}
};

module.exports = { remove };
