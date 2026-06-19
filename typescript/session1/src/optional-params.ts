function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

function createAccount(email: string, role: string = "user"): object {
  return { email, role };
}