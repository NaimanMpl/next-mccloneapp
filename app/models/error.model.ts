export class AuthentificationError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'AuthentificationError'
  }

}

export class UploadError extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'UploadError'
  }

}