/*
Task 1.2 — ConfigManager Singleton

If ConfigManager.get() returned an empty string instead of throwing when a key
does not exist, it would be a silent failure. The application would continue
running with incorrect configuration, making the real problem difficult to
detect.

Throwing an error is safer because it follows the Fail Fast principle. It
immediately reports the missing configuration, making the problem easier to
find and fix.
*/

class ConfigManager {
  // Singleton instance
  private static instance: ConfigManager | null = null;

  // Configuration storage
  private config: Record<string, string> = {};

  // Private constructor
  private constructor() {
    this.config["env"] = "development";
    this.config["database"] = "postgres";
    this.config["version"] = "1.0.0";
  }

  // Returns the single ConfigManager instance
  public static getInstance(): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager();
    }

    return ConfigManager.instance;
  }

  // Store a configuration value
  public set(key: string, value: string): void {
    this.config[key] = value;
  }

  // Retrieve a configuration value
  public get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(
        `ConfigManager.get: configuration key '${key}' does not exist`
      );
    }

    return this.config[key];
  }
}

// ----------------------
// Expected usage
// ----------------------

const config = ConfigManager.getInstance();

config.set("apiUrl", "http://localhost:3001");

const sameConfig = ConfigManager.getInstance();

console.log(sameConfig.get("apiUrl"));
console.log(config === sameConfig);