import { CoreConstants } from "../types/constant/CoreConstants";

export class DeviceUtils {
    public static defineDevice(): void {
        CoreConstants.deviceType.IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || CoreConstants.deviceType.isIpad;

        CoreConstants.deviceType.DESKTOP = this.getPlatform() === 'desktop';
        CoreConstants.deviceType.MOBILE = !CoreConstants.deviceType.DESKTOP;
    }

    public static getPlatform(): string {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
        ) {
            return "mobile";
        }
        return "desktop";
    }
}
