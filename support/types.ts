export type Data = { [key: string]: any };
export type ValidationRule = (value: any, args?: string[], prop?: string, data?: Data) => Promise<void>
