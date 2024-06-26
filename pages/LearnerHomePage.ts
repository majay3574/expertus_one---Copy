import { LearnerLogin } from "./LearnerLogin";
import { BrowserContext, Page } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";

export class LearnerHomePage extends LearnerLogin {
    static pageUrl = URLConstants.leanerURL;

    public selectors = {
        signOutLink: "//div[@class='logout']/a",
        menuLink: (menu: string) => `//a//span[text()='${menu}']`
        // Add more selectors as needed
    };

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context);
    }

    public async common(page: Page, context: BrowserContext) {
        await this.loadApp(LearnerHomePage.pageUrl);
        let pageTitle = await this.getTitle();
        console.log(pageTitle);
        if (pageTitle.startsWith("Sign In")) {
            // Handle login if necessary
            const learnLog = new LearnerLogin(page, context);
        }
    }

    public async isSignOutVisible() {
        await this.page.waitForLoadState('load');
        await this.validateElementVisibility(this.selectors.signOutLink, "Sign Out");
    }

    public async clickMenu(menu: string) {
        await this.validateElementVisibility(this.selectors.menuLink(menu), menu);
        await this.click(this.selectors.menuLink(menu), menu, "Button");
        await this.page.waitForLoadState('load');
    }
}
