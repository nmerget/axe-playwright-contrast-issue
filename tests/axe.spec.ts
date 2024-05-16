import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("axe contrast", async ({ page }) => {
  await page.goto("/");
  const { color, backgroundColor } = await page.evaluate(() => {
    const badge = document.querySelector("#badge");
    if (badge) {
      const styles = window.getComputedStyle(badge);
      return { color: styles.color, backgroundColor: styles.backgroundColor };
    }

    return { color: "", backgroundColor: "" };
  });

  console.log(color, backgroundColor);

  expect(color).toEqual("rgb(255, 255, 255)");
  expect(backgroundColor).toEqual("rgb(0, 0, 0)");

  const accessibilityScanResults = await new AxeBuilder({
    page,
  })
    .include("#root")
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
