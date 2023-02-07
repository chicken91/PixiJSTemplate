import { StringReplacement } from '../types/interface/CoreTypes';

export class StringUtils {
    public static replacePatternInText(text: string, patterns: Array<StringReplacement>): string {
        patterns.forEach(change => {
            text = text.replace(change.pattern, change.replacement);
        });
        return text;
    }
}