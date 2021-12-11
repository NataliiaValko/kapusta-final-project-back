const { Transaction } = require("../../model");

const getAll = async ({ user: { _id } }, query) => {
	try {
		const searchOptions = { owner: _id };

		if ("type" in query) {
			const { type } = query;
			searchOptions.type = type;
		}

		if ("category" in query) {
			const { category } = query;
			searchOptions.category = category;
		}

		if ("comment" in query) {
			const { comment } = query;
			searchOptions.comment = comment;
		}

		return await Transaction.find(searchOptions).populate("owner", "email");
	} catch (error) {
		return error;
	}
};

module.exports = { getAll };
