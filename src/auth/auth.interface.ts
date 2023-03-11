export interface IGoogleProfile {
	sub: string
	email: string
	name: string
	familyName: string
	givenName: string
	locale: string
	picture: string
	email_verified: boolean
}

export interface IResGoogleUser {
	email: string
	name: string
	avatarPath: string
}
