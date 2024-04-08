export class FilePathGeneratorHelper {
    static async makeFilePath(category: string): Promise<string> {
        const path = `/${category}/${await this.getCurrentDate()}`
        return path
    }

    static async getCurrentDate(): Promise<string> {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}