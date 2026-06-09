import { expect, test } from "@playwright/test";

test("homepage presents the center project shell and follows system dark mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Center for Multimodal Learning/i,
    })
  ).toBeVisible();
  await expect(page.getByText(/UCSB Electrical and Computer Engineering/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore BisQue Ultra/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open BisQue page/i })).toBeVisible();
  await expect(page.getByTestId("theme-toggle")).toHaveCount(0);
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "BisQue Ultra", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "BisQue", exact: true })
  ).toBeVisible();

  const primaryButton = page.getByRole("link", { name: /Explore BisQue Ultra/i });
  await expect(primaryButton).toHaveCSS("color", "rgb(17, 17, 19)");
});

test("BisQue Ultra landing page moved to its own route", async ({ page }) => {
  await page.goto("/bisque-ultra");

  await expect(page).toHaveTitle("BisQue Ultra | Scientific AI Workbench and Run Control Plane");
  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra", exact: true })).toBeVisible();
  await expect(page.getByText(/Scientific AI run control for image research/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Read the launch brief/i })).toBeVisible();
  await expect(page.getByText(/Created within the UCSB Vision Research Lab/i)).toBeVisible();
  await expect(page.locator(".story-tile-large .story-tile-image")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Go control plane", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Postgres and NATS JetStream keep long work recoverable/i })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "OpenAI-compatible model layer", exact: true })).toBeVisible();
});

test("BisQue placeholder page renders", async ({ page }) => {
  await page.goto("/bisque");

  await expect(page.getByRole("heading", { level: 1, name: "BisQue", exact: true })).toBeVisible();
  await expect(page.getByText(/This page is reserved for the next content pass on BisQue/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Read BisQue docs/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore BisQue Ultra/i })).toBeVisible();
});

test("white paper route renders content and on-page navigation", async ({ page }) => {
  await page.goto("/news/bisque-ultra");
  await expect(page).toHaveTitle("BisQue Ultra | Center for Multimodal Learning");

  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra", exact: true })).toBeVisible();
  await expect(
    page.getByText(/BisQue Ultra is a scientific AI control plane wrapped in a workbench/i)
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /What changed in the updated stack/i })).toBeVisible();

  const jumpMenu = page.locator("[data-article-jump]");
  await expect(jumpMenu).toHaveAttribute("data-visible", "false");
  await expect(jumpMenu).not.toHaveAttribute("open", "");

  await page.evaluate(() => {
    window.scrollTo(0, 1100);
  });

  await expect(jumpMenu).toHaveAttribute("data-visible", "true");
  await expect(jumpMenu).not.toHaveAttribute("open", "");
  await jumpMenu.locator(".article-jump-summary").click();
  await expect(jumpMenu).toHaveAttribute("open", "");
  await expect(jumpMenu.getByRole("link", { name: /What teams can safely claim now/i })).toBeVisible();
});

test("news index and a follow-up post both render", async ({ page }) => {
  await page.goto("/news");
  await expect(page.getByRole("heading", { name: /Read the launch, the platform proof, and the interface update/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /BisQue Platform: storage, visualization, analysis, and extensibility/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Why the BisQue Ultra frontend looks the way it does/i })).toBeVisible();
});

test("BisQue platform feature article renders docs imagery and platform links", async ({ page }) => {
  await page.goto("/news/bisque-platform-features");

  await expect(
    page.getByRole("heading", { name: /BisQue Platform: storage, visualization, analysis, and extensibility/i })
  ).toBeVisible();
  await expect(
    page.getByText(/BisQue was built to resist that drift\./i)
  ).toBeVisible();
  await expect(page.getByAltText(/official bisque documentation banner/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Data storage/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Install Python BQAPI/i })).toBeVisible();
});

test("release alias, sitemap, and robots stay publishable", async ({ page, request }) => {
  const releaseResponse = await page.goto("/releases/bisque-ultra");
  expect(releaseResponse?.status()).toBeLessThan(400);
  await page.waitForURL(/\/news\/bisque-ultra\/?$/);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  await expect
    .poll(async () => await sitemap.text())
    .toContain("/bisque-ultra");
  await expect
    .poll(async () => await sitemap.text())
    .toContain("/bisque");
  await expect
    .poll(async () => await sitemap.text())
    .toContain("/news/bisque-ultra");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  await expect
    .poll(async () => await robots.text())
    .toContain("Sitemap:");
});

test("frontend showcase article renders embedded interface demos", async ({ page }) => {
  await page.goto("/news/frontend-showcase");

  await expect(
    page.getByRole("heading", { name: /Why the BisQue Ultra frontend looks the way it does/i })
  ).toBeVisible();
  await expect(
    page.getByText(/A shell that orients the user without competing with the work/i)
  ).toBeVisible();
  await expect(page.getByText(/A control surface that makes priority obvious/i)).toBeVisible();
  await expect(page.getByText(/Language and proof stay close to each other/i)).toBeVisible();
});
