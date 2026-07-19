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
  await expect(page.getByText("UCSB ELECTRICAL & COMPUTER ENGINEERING")).toBeVisible();
  await expect(page.getByText(/UCSB Electrical and Computer Engineering/i)).toBeVisible();
  await expect(page.getByText("Hyperspectral remote sensing", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore BisQue Ultra/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open BisQue platform/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Collaborate with us/i }).first()).toBeVisible();
  await expect(page.locator(".research-ultra-hero-frame img")).toHaveAttribute("src", "/images/home/ultra-hero-960.webp");
  await expect(page.getByRole("heading", { name: /Bright 4B scales hyperspherical learning/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /PSF-aware patch embeddings/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Spectral-absorption-aware transformers/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Aerial image analysis for multi-species/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Location-aware patch-based CNNs/i })).toBeVisible();
  await expect(page.getByText(/Scientific Reports 2023/i)).toBeVisible();
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

test("BisQue Ultra landing page communicates the current product release", async ({ page }) => {
  await page.goto("/bisque-ultra");

  await expect(page).toHaveTitle("BisQue Ultra | Agentic System for Science");
  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra", exact: true })).toBeVisible();
  await expect(page.getByText(/agentic distributed system that runs real research where the data live/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Request research access/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Run locally/i })).toBeVisible();
  await expect(page.getByText(/Built in the UCSB Vision Research Lab/i)).toBeVisible();
  await expect(page.locator(".launch-hero-art-image")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Go control plane", exact: true })).toBeVisible();
  await expect(page.getByText(/The hard part is already built, deployed, and measured/i)).toBeVisible();
  await expect(page.locator(".ultra-metric-value").filter({ hasText: "59 ms" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Model improvement is a reviewable/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /closed human-in-the-loop cycle is implemented/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /evaluate the orchestration tier the way a lab evaluates a model/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /4B-parameter vision model is more useful/i })).toBeVisible();
  await expect(page.getByText("Can BisQue Ultra run locally?", { exact: true })).toBeVisible();
  await expect(page.getByAltText(/candidate model that failed two evaluation gates/i)).toBeVisible();
});

test("BisQue platform page renders research infrastructure content", async ({ page }) => {
  await page.goto("/bisque");

  await expect(page).toHaveTitle("BisQue | Scientific Image Informatics Platform");
  await expect(page.getByRole("heading", { level: 1, name: "BisQue", exact: true })).toBeVisible();
  await expect(page.getByText(/Scientific image informatics for reproducible computer vision/i)).toBeVisible();
  const bisqueOverview = page.getByLabel("BisQue overview");
  await expect(bisqueOverview.getByRole("link", { name: /Open BisQue/i })).toBeVisible();
  await expect(bisqueOverview.getByRole("link", { name: /Read docs/i })).toBeVisible();
  await expect(bisqueOverview.getByRole("link", { name: /View repository/i })).toBeVisible();
  await expect(page.locator(".bisque-workshop-frame img")).toHaveAttribute(
    "src",
    "/images/bisque/workshop/store-share-collaborate-800.webp"
  );
  await expect(page.getByRole("heading", { name: /A scientific image platform built/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /BisQue turns scientific image work/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Large mosaics stay inspectable/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /BisQue organizes scientific resources/i })).toBeVisible();
  await expect(page.getByText(/Frontiers in Neuroscience 2020/i)).toBeVisible();
  await expect(page.getByText(/BME Frontiers 2022/i)).toBeVisible();
  await expect(page.getByText(/Scientific Reports 2023/i)).toBeVisible();
});

test("launch brief renders current content and on-page navigation", async ({ page }) => {
  await page.goto("/news/bisque-ultra");
  await expect(page).toHaveTitle("BisQue Ultra 2026.07 research release | UCSB CML");

  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra 2026.07", exact: true })).toBeVisible();
  await expect(
    page.getByText(/scientific AI workbench for the full path from complex data to reviewable result/i)
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /What changed in 2026.07/i })).toBeVisible();

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
  await expect(jumpMenu.getByRole("link", { name: /Run the stack locally/i })).toBeVisible();
});

test("news index and a follow-up post both render", async ({ page }) => {
  await page.goto("/news");
  await expect(page.getByRole("heading", { name: /systems that make it credible/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /The performance envelope/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Evaluate the system like a model/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Making sensor data safe for autonomous agents/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /scientific image engine behind BisQue Ultra/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /GoldGate model lifecycle/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Evidence-aware materials research/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /BisQue Platform: storage, visualization, analysis, and extensibility/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Why the BisQue Ultra frontend looks the way it does/i })).toBeVisible();
});

test("new research and engineering notes render their core claims", async ({ page }) => {
  await page.goto("/news/production-performance-envelope");
  await expect(page.getByRole("heading", { level: 1, name: /The performance envelope/i })).toBeVisible();
  await expect(page.getByText(/59 ms to first token/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /the gigapixel case is the ordinary case/i })).toBeVisible();

  await page.goto("/news/ngff-sensor-hardening");
  await expect(page.getByRole("heading", { level: 1, name: /Making sensor data safe for autonomous agents/i })).toBeVisible();
  await expect(page.getByText(/23 malformed stores all fail closed/i).first()).toBeVisible();

  await page.goto("/news/ultra-mode-research");
  await expect(page.getByRole("heading", { level: 1, name: /Evaluate the system like a model/i })).toBeVisible();
  await expect(page.getByText(/Coverage.Compression.Verification/i).first()).toBeVisible();
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
    .toContain("/access");
  await expect
    .poll(async () => await sitemap.text())
    .toContain("/news/bisque-ultra");
  await expect
    .poll(async () => await sitemap.text())
    .toContain("/news/gold-gated-model-lifecycle");

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
  await expect(page.getByText(/A control layout that makes priority obvious/i)).toBeVisible();
  await expect(page.getByText(/Language and proof stay close to each other/i)).toBeVisible();
});

test("research access page presents honest collaboration paths", async ({ page }) => {
  await page.goto("/access");

  await expect(page).toHaveTitle("Request BisQue Ultra Access | Center for Multimodal Learning");
  await expect(page.getByRole("heading", { level: 1, name: /Bring your scientific workflow/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Request research access/i }).first()).toHaveAttribute(
    "href",
    /mailto:amil@ucsb\.edu/,
  );
  await expect(page.getByRole("heading", { name: "Research access", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Scientific collaboration", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Institutional deployment", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Strategic partnership", exact: true })).toBeVisible();
});

test("current engineering notes preserve implementation and readiness boundaries", async ({ page }) => {
  await page.goto("/news/scientific-imaging-engine");
  await expect(page.getByRole("heading", { level: 1, name: /scientific image engine/i })).toBeVisible();
  await expect(page.getByText(/more than 90 scientific formats/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Viewers preserve different kinds of evidence/i })).toBeVisible();

  await page.goto("/news/gold-gated-model-lifecycle");
  await expect(page.getByRole("heading", { level: 1, name: /GoldGate model lifecycle/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Gates turn metrics into policy/i })).toBeVisible();
  await expect(page.getByText(/active model stays active when a candidate fails/i)).toBeVisible();

  await page.goto("/news/materials-research-evidence");
  await expect(page.getByRole("heading", { level: 1, name: /Evidence-aware materials research/i })).toBeVisible();
  await expect(page.getByText(/evidence-gated research capability/i)).toBeVisible();
  await expect(page.getByText(/It is not production-promoted/i)).toBeVisible();
});
