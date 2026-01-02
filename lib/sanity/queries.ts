import { groq } from 'next-sanity'

// ==========================================
// Singleton Queries
// ==========================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteName,
    siteDescription,
    siteUrl,
    socialImage,
    googleAnalyticsId,
    ownerName,
    ownerTitle
  }
`

export const bootSequenceQuery = groq`
  *[_type == "bootSequence"][0] {
    _id,
    _type,
    asciiArtName,
    bootMessages[] {
      _key,
      message,
      type,
      delay
    },
    bootDuration,
    showSkipButton,
    skipButtonDelay
  }
`

export const playerConfigQuery = groq`
  *[_type == "playerConfig"][0] {
    _id,
    _type,
    defaultVolume,
    autoPlay,
    showVisualizer,
    defaultStream->{
      _id,
      name,
      streamUrl,
      artwork
    },
    skin
  }
`

export const themeSettingsQuery = groq`
  *[_type == "themeSettings"][0] {
    _id,
    _type,
    accentColor,
    terminalFont,
    terminalFontSize,
    defaultWallpaper->{
      _id,
      name,
      image,
      colorScheme
    },
    dockPosition,
    dockAutoHide
  }
`

// ==========================================
// Desktop Queries
// ==========================================

export const desktopAppsQuery = groq`
  *[_type == "desktopApp" && enabled == true] | order(dockOrder asc) {
    _id,
    _type,
    appId,
    title,
    icon,
    iconName,
    enabled,
    showInDock,
    dockOrder,
    defaultWindowConfig {
      width,
      height,
      x,
      y,
      resizable,
      minimizable,
      maximizable
    }
  }
`

export const desktopShortcutsQuery = groq`
  *[_type == "desktopShortcut" && enabled == true] | order(order asc) {
    _id,
    _type,
    title,
    url,
    icon,
    iconType,
    order,
    enabled,
    openInNewTab,
    description
  }
`

// ==========================================
// About Queries
// ==========================================

export const aboutSectionsQuery = groq`
  *[_type == "aboutSection" && enabled == true] | order(order asc) {
    _id,
    _type,
    title,
    sectionType,
    content,
    order,
    enabled
  }
`

export const experiencesQuery = groq`
  *[_type == "experience" && enabled == true] | order(startDate desc) {
    _id,
    _type,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    description,
    highlights,
    logo,
    location,
    order,
    enabled
  }
`

export const educationQuery = groq`
  *[_type == "education" && enabled == true] | order(endYear desc) {
    _id,
    _type,
    institution,
    degree,
    fieldOfStudy,
    startYear,
    endYear,
    inProgress,
    details,
    credentialUrl,
    logo,
    order,
    enabled
  }
`

export const skillsQuery = groq`
  *[_type == "skill" && enabled == true] | order(category asc, order asc) {
    _id,
    _type,
    name,
    category,
    proficiency,
    proficiencyLevel,
    yearsOfExperience,
    icon,
    iconName,
    description,
    featured,
    order,
    enabled
  }
`

export const skillsByCategoryQuery = groq`
  *[_type == "skill" && enabled == true && category == $category] | order(order asc) {
    _id,
    _type,
    name,
    category,
    proficiency,
    proficiencyLevel,
    yearsOfExperience,
    icon,
    iconName,
    description,
    featured,
    order,
    enabled
  }
`

// ==========================================
// Project Queries
// ==========================================

export const projectsQuery = groq`
  *[_type == "project" && enabled == true] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    subtitle,
    featuredImage,
    client,
    year,
    technologies,
    featured,
    order
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && enabled == true && featured == true] | order(order asc) {
    _id,
    _type,
    title,
    slug,
    subtitle,
    featuredImage,
    client,
    year,
    technologies
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    subtitle,
    featuredImage,
    context,
    concept,
    process,
    execution,
    result,
    reflection,
    screenshots[] {
      _key,
      asset,
      caption,
      alt
    },
    client,
    year,
    duration,
    role,
    technologies,
    liveUrl,
    repoUrl,
    featured,
    order,
    enabled
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && enabled == true].slug.current
`

// ==========================================
// Terminal Queries
// ==========================================

export const terminalCommandsQuery = groq`
  *[_type == "terminalCommand" && enabled == true] | order(command asc) {
    _id,
    _type,
    command,
    aliases,
    category,
    description,
    response,
    plainTextResponse,
    isAsciiArt,
    clearScreen,
    showInHelp,
    order,
    enabled
  }
`

export const terminalCommandByNameQuery = groq`
  *[_type == "terminalCommand" && enabled == true && (command == $command || $command in aliases)][0] {
    _id,
    _type,
    command,
    aliases,
    category,
    description,
    response,
    plainTextResponse,
    isAsciiArt,
    clearScreen,
    showInHelp,
    order,
    enabled
  }
`

export const helpCommandsQuery = groq`
  *[_type == "terminalCommand" && enabled == true && showInHelp == true] | order(order asc) {
    _id,
    command,
    description,
    category
  }
`

// ==========================================
// Media Queries
// ==========================================

export const radioStreamsQuery = groq`
  *[_type == "radioStream" && enabled == true] | order(order asc) {
    _id,
    _type,
    name,
    streamUrl,
    description,
    artwork,
    spinitronStationId,
    mixcloudUsername,
    mixcloudShowSlug,
    genre,
    websiteUrl,
    isDefault,
    order,
    enabled
  }
`

export const defaultRadioStreamQuery = groq`
  *[_type == "radioStream" && enabled == true && isDefault == true][0] {
    _id,
    _type,
    name,
    streamUrl,
    description,
    artwork,
    spinitronStationId,
    mixcloudUsername,
    genre,
    websiteUrl
  }
`

export const wallpapersQuery = groq`
  *[_type == "wallpaper" && enabled == true] | order(order asc) {
    _id,
    _type,
    name,
    image,
    description,
    credit,
    creditUrl,
    category,
    colorScheme,
    isActive,
    order,
    enabled
  }
`

export const activeWallpaperQuery = groq`
  *[_type == "wallpaper" && enabled == true && isActive == true][0] {
    _id,
    _type,
    name,
    image,
    description,
    credit,
    creditUrl,
    category,
    colorScheme
  }
`

export const wallpapersByCategoryQuery = groq`
  *[_type == "wallpaper" && enabled == true && category == $category] | order(order asc) {
    _id,
    _type,
    name,
    image,
    description,
    credit,
    creditUrl,
    category,
    colorScheme,
    isActive,
    order
  }
`
