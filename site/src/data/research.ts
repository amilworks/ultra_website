export const sourceLinks = {
  bisqueRepo: "https://github.com/UCSB-VRL/bisqueUCSB",
  ultraRepo: "https://github.com/amilworks/ultra",
  methaneMapperRepo:
    "https://github.com/UCSB-VRL/MethaneMapper-Spectral-Absorption-aware-Hyperspectral-Transformer-for-Methane-Detection",
  wildlifeMapperRepo: "https://github.com/UCSB-VRL/WildlifeMapper",
  ebsdRepo: "https://github.com/UCSB-VRL/EBSD-Superresolution",
  cellAnalysisRepo: "https://github.com/UCSB-VRL/Time-lapse3DCellAnalysis",
  researchOutreach:
    "https://researchoutreach.org/articles/reproducible-computer-vision-cross-disciplinary-scalable-image-informatics/",
  methaneMapperPaper:
    "https://openaccess.thecvf.com/content/CVPR2023/papers/Kumar_MethaneMapper_Spectral_Absorption_Aware_Hyperspectral_Transformer_for_Methane_Detection_CVPR_2023_paper.pdf",
  wildlifeMapperPaper:
    "https://openaccess.thecvf.com/content/CVPR2024/papers/Kumar_WildlifeMapper_Aerial_Image_Analysis_for_Multi-Species_Detection_and_Identification_CVPR_2024_paper.pdf",
  ebsdPaper: "https://www.nature.com/articles/s41524-022-00924-2",
  brainTumorPaper:
    "https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2019.01449/full",
  hydrocephalusPaper: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10521674/",
  hydrocephalusPublisherPaper: "https://spj.science.org/doi/10.34133/2022/9783128",
  cellAnalysisPaper: "https://www.nature.com/articles/s41598-023-29149-z",
};

export const researchPrograms = [
  {
    name: "MethaneMapper",
    domain: "Hyperspectral remote sensing",
    title: "Spectral-absorption-aware transformers for methane detection",
    venue: "CVPR 2023 Highlight",
    summary:
      "Detects methane plumes from airborne hyperspectral imagery with a model designed around absorption wavelengths, plus the public Methane HotSpot dataset and BisQue visualization tooling.",
    evidence:
      "The repository includes source code, pretrained plume detection and segmentation weights, MHS dataset download scripts, and a BisQue online dataset viewer.",
    links: [
      { label: "Repository", href: sourceLinks.methaneMapperRepo },
      { label: "CVPR paper", href: sourceLinks.methaneMapperPaper },
    ],
  },
  {
    name: "WildlifeMapper",
    domain: "Ecological computer vision",
    title: "Aerial image analysis for multi-species detection and identification",
    venue: "CVPR 2024",
    summary:
      "Turns aerial imagery into detection, localization, and species-identification signals for wildlife monitoring, grounded in a verified dataset of 11k images and 28k annotations.",
    evidence:
      "The public repository ships model code, pretrained detector weights, dataset tooling, and a BisQue visualization route for the Mara-Wildlife dataset.",
    links: [
      { label: "Repository", href: sourceLinks.wildlifeMapperRepo },
      { label: "CVPR paper", href: sourceLinks.wildlifeMapperPaper },
    ],
  },
  {
    name: "EBSD Superresolution",
    domain: "Materials microscopy",
    title: "Physics-based super-resolution for electron backscatter diffraction maps",
    venue: "npj Computational Materials 2022",
    summary:
      "Adapts super-resolution to EBSD orientation maps using crystallographic symmetry, quaternion-aware orientation recognition, and physics-aware losses.",
    evidence:
      "The project connects network training, inference, IPF-map visualization, and BisQue module deployment for high-throughput materials characterization.",
    links: [
      { label: "Repository", href: sourceLinks.ebsdRepo },
      { label: "Nature paper", href: sourceLinks.ebsdPaper },
    ],
  },
  {
    name: "MRI Brain Tumor Segmentation",
    domain: "Clinical neuroimaging",
    title: "Location-aware patch-based CNNs for MRI brain tumor segmentation",
    venue: "Frontiers in Neuroscience 2020",
    summary:
      "Improves glioma segmentation by registering a brain parcellation atlas into each subject space and combining that location signal with multimodal MR images, 3D U-Net, DeepMedic, and ensemble learning.",
    evidence:
      "The paper reports that location information improves patch-based neural networks for BraTS brain tumor segmentation and uses model diversity plus uncertainty reduction in a two-level ensemble.",
    links: [{ label: "Frontiers paper", href: sourceLinks.brainTumorPaper }],
  },
  {
    name: "Normal Pressure Hydrocephalus",
    domain: "Clinical neuroimage analysis",
    title: "Automated CT segmentation and connectome-aware NPH prediction",
    venue: "BME Frontiers 2022",
    summary:
      "Segments regions of interest from CT brain scans, combines them with diffusion tractography and connectome features, and predicts Normal Pressure Hydrocephalus from measurable neuroanatomy.",
    evidence:
      "The article describes an automated NPH prediction method from CT scans that incorporates MRI diffusion tractography information, with reported gains over prior state-of-the-art precision and recall.",
    links: [
      { label: "PMC article", href: sourceLinks.hydrocephalusPaper },
      { label: "Publisher page", href: sourceLinks.hydrocephalusPublisherPaper },
    ],
  },
  {
    name: "Time-lapse 3D Cell Analysis",
    domain: "Bioimage analysis",
    title: "Segmentation, tracking, and sub-cellular feature extraction in 3D time-lapse images",
    venue: "Scientific Reports 2023",
    summary:
      "Turns time-lapse 3D confocal image stacks into quantitative cell histories with rotation-equivariant 3D segmentation, adjacency-graph feature extraction, and graph-based tracking.",
    evidence:
      "The Scientific Reports paper states that code is available on GitHub and the method is available as a service through the BisQue portal.",
    links: [
      { label: "Repository", href: sourceLinks.cellAnalysisRepo },
      { label: "Scientific Reports paper", href: sourceLinks.cellAnalysisPaper },
    ],
  },
];

export const bisqueCapabilities = [
  {
    name: "5D scientific images",
    detail:
      "BisQue is described as a web platform for organizing and quantitatively analyzing up to 5D image data.",
  },
  {
    name: "Flexible metadata",
    detail:
      "The platform's metadata facility and open web architecture let researchers create, develop, and share multimodal analyses.",
  },
  {
    name: "Scalable storage",
    detail:
      "The public README describes cloud scalability for PB-scale images, millions of annotations, distributed storage, and large 5D images.",
  },
  {
    name: "Analysis modules",
    detail:
      "Researchers can extend BisQue with modules that run image analysis in MATLAB, Python, Java, and ImageJ-oriented workflows.",
  },
  {
    name: "Cross-domain research",
    detail:
      "The platform has been used across biomedical sciences, neuroscience, wildlife conservation, marine science, and materials science.",
  },
  {
    name: "Browser access",
    detail:
      "Research Outreach describes cloud-based analytics that make analysis tools available through a web browser with light client requirements.",
  },
];
