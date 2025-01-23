import type { User } from "../services/types";

function calculateRanking(users: User[]): void {
  const sortedUsers = [...users].sort(
    (a, b) => b.total_points - a.total_points,
  );
  sortedUsers.forEach((user, index) => {
    user.total_points = index + 1;
    if (
      index > 0 &&
      user.total_points === sortedUsers[index - 1].total_points
    ) {
      user.total_points = sortedUsers[index - 1].total_points;
    }
  });
}

export default calculateRanking;
