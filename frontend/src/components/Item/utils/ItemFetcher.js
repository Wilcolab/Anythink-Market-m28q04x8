import agent from "../../../agent";

export async function getItemAndComments(id) {
  return await Promise.all([agent.Items.get(id), agent.Comments.forItem(id)]);
}
