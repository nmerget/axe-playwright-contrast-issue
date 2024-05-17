import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("axe contrast", async ({ page }, { project }) => {
  await page.goto("/");
  await page.evaluate(($project) => {
    if ($project.use.contextOptions?.forcedColors === "active") {
      const style = document.createElement("style");
      document.head.appendChild(style);
      const textColor = $project.use.colorScheme === "dark" ? "#fff" : "#000";
      style.textContent = `* {-webkit-text-stroke-color:${textColor}!important;-webkit-text-fill-color:${textColor}!important;}`;
    }
  }, project);

  const accessibilityScanResults = await new AxeBuilder({
    page,
  })
    .include("#root")
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
