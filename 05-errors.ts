class AuthService {
  private users = [
    { id: 1, username: "admin", password: "1234" },
    { id: 2, username: "user", password: "pass" },
  ];

  login(username: string, password: string): { id: number; username: string; password: string } | null {
    const user = this.users.find(u => u.username === username);
    if (!user) return null;
    if (user.password !== password) return null;
    return user;
  }

  parseUserData(data: string): { name: string; email: string } | null {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.name || !parsed.email) {
        console.log("Error: Invalid user data");
        return null;
      }
      return parsed;
    } catch {
      console.log("Error: Failed to parse JSON");
      return null;
    }
  }

  updatePassword(userId: number, newPass: string): boolean {
    if (newPass.length < 3) return false;
    const user = this.users.find(u => u.id === userId);
    if (!user) return false;
    user.password = newPass;
    return true;
  }

  processRequest(request: string): "success" | "failed" {
    let data: any;
    try {
      data = JSON.parse(request);
    } catch {
      return "failed";
    }

    const user = this.login(data.username, data.password);
    if (!user) return "failed";

    if (!data.profile) return "failed";

    const profile = this.parseUserData(data.profile);
    if (!profile) return "failed";

    return "success";
  }
}

// Main function
function main05() {
  const auth = new AuthService();

  const result1 = auth.login("admin", "wrong");
  const result2 = auth.login("nonexistent", "pass");

  if (!result1) console.log("Login failed");
  if (!result2) console.log("Login failed");

  const data = auth.parseUserData("invalid json");
  if (!data) console.log("Parse failed");

  const status = auth.processRequest('{"username":"admin"}');
  console.log("Status: " + status);
}

main05();
