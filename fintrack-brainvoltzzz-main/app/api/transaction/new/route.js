import User from "@/Models/User";
import { connectToDatabase } from "@/utils/database";

export const POST = async (request) => {
  const { user, title, amount, category, image } = await request.json();

  try {
    await connectToDatabase();

    const userToUpdate = await User.findByIdAndUpdate(user, {
      $set: { lastTransactionRefresh: Date.now() },
      $push: {
        transactions: {
          title,
          amount,
          category,
          image,
        },
      },
      $inc: { currentTokens: 0.05 * amount },
    });

    return new Response(JSON.stringify(userToUpdate), {
      status: 201,
    });
  } catch (error) {
    return new Response("Error Adding Transaction", { status: 500 });
  }
};
