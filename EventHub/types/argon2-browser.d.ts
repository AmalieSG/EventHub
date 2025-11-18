declare module "argon2-browser" {
  export type Argon2HashOptions = {
    pass: string;
    salt: Uint8Array;
    time?: number;
    mem?: number;
    hashLen?: number;
    parallelism?: number;
    type?: number;
  };

  export type Argon2VerifyOptions = {
    pass: string;
    encoded: string;
  };

  export function hash(
    options: Argon2HashOptions
  ): Promise<{ encoded: string; hash: Uint8Array }>;

  export function verify(options: Argon2VerifyOptions): Promise<boolean>;
}
