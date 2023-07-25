import User from "@/Models/User";
import { connectToDatabase } from "@/utils/database";

export const GET = async ({ params }) => {
  try {
    await connectToDatabase();

    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Error Fetching User", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { category, product } = await request.json();

  try {
    await connectToDatabase();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    user.dreamProductType = category;
    user.dreamProduct = product;

    await user.save();

    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};
