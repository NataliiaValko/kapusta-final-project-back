const { User } = require("../../model");

const changeBalance = async (
	{ owner: { email }, amount, type },
	isDeletingTransaction = false
) => {
	try {
		const user = await User.findOne({ email });

		if (isDeletingTransaction) {
			amount *= -1;
		}

		type === "income" ? (user.balance += amount) : (user.balance -= amount);

		await user.save();

		return user.balance;
	} catch (error) {
		return error;
	}
};

module.exports = { changeBalance };
