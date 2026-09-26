import type { StoryChapter } from '@/payload-types'

export interface StoryActMeta {
  order: number
  chapterKey: 'prologue' | 'evangelism' | 'discipleship' | 'leadership' | 'mission'
  actRoman: string
  pillarName: string
  headline: string
  subheadline: string
  scriptureRef: string
  scriptureText: string
  visualDescription: string
  atmosphericTransition: string
  theologyTheme: string
  accentColor: string
  defaultMediaUrl: string
}

export const CANONICAL_ACTS: StoryActMeta[] = [
  {
    order: 0,
    chapterKey: 'prologue',
    actRoman: 'Act 0',
    pillarName: 'Prologue • The Sovereign Architect',
    headline: 'Jesus the Master Builder Global Ministry',
    subheadline:
      "Everything begins in God's sovereign hands. Before the foundations of the cosmos were laid, the divine master builder set every destiny in motion.",
    scriptureRef: 'Hebrews 3:4',
    scriptureText: 'For every house is built by someone, but God is the builder of everything.',
    visualDescription:
      'Deep cosmic view. Earth glowing in the hollow of God’s radiant hand with volumetric sun rays.',
    atmosphericTransition:
      'Dense celestial clouds and Shekinah mist sweep across the lens, parting as the camera plummets down through the atmosphere.',
    theologyTheme: "The Master Builder's Blueprint. Everything begins in God's sovereign hands.",
    accentColor: '#E3A857', // Radiant gold
    defaultMediaUrl: '/videos/act0_architect.mp4',
  },
  {
    order: 1,
    chapterKey: 'evangelism',
    actRoman: 'Act I',
    pillarName: 'Pillar I • Evangelism',
    headline: 'The True Vine & The Fruit',
    subheadline:
      'Reaching souls by abiding in Christ. Evangelism is not human striving, but the natural, overflowing fruit of intimacy with the Vine.',
    scriptureRef: 'John 15:5',
    scriptureText:
      'I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.',
    visualDescription:
      'Camera emerges through parted clouds into a sun-drenched vineyard. The True Vine pulses with life, branching outward with vibrant clusters of ripe fruit.',
    atmosphericTransition:
      'Heavy morning mist rolls across the vineyard; camera tilts down toward the fertile soil.',
    theologyTheme: 'Reaching souls by abiding in Christ. Evangelism is the natural fruit of intimacy with the Vine.',
    accentColor: '#8A9A5B', // Olive Sage
    defaultMediaUrl: '/videos/act1_evangelism.mp4',
  },
  {
    order: 2,
    chapterKey: 'discipleship',
    actRoman: 'Act II',
    pillarName: 'Pillar II • Discipleship',
    headline: 'The Seed & Deep Good Soil',
    subheadline:
      'Internalizing the Word through sacred formation. Sown in pure, fertile, unobstructed good soil, the seed takes deep root to produce an enduring spiritual harvest.',
    scriptureRef: 'Matthew 13:8 & Colossians 2:7',
    scriptureText:
      'Still other seed fell on good soil, where it produced a crop—a hundred, sixty or thirty times what was sown... Rooted and built up in Him, strengthened in the faith as you were taught.',
    visualDescription:
      'The fruit yields a seed falling into dark, rich, fertile loam. Sown in pure, unobstructed good soil, the seed takes deep root to flourish into an enduring spiritual harvest.',
    atmosphericTransition:
      'Sacred morning dew enriches the earth; divine light warms the ground as holy fire begins to stir on the altar.',
    theologyTheme: 'Internalizing the Word in good soil. Sacred formation rooted deeply in fertile faith.',
    accentColor: '#C1683B', // Terracotta Earth
    defaultMediaUrl: '/videos/act2_discipleship.mp4',
  },
  {
    order: 3,
    chapterKey: 'leadership',
    actRoman: 'Act III',
    pillarName: 'Pillar III • Leadership',
    headline: 'The Holy Fire',
    subheadline:
      'Equipped by the flame of the Holy Spirit. Servant leaders are forged in the refiner’s fire—burning as guiding beacons of divine light that illuminate the path for others.',
    scriptureRef: 'Hebrews 1:7 & Acts 2:3–4',
    scriptureText:
      'He makes His ministers a flame of fire... They saw what seemed to be tongues of fire that separated and came to rest on each of them. And all of them were filled with the Holy Spirit.',
    visualDescription:
      'The Holy Fire burns brightly upon the altar of God. Sacred golden and terracotta flames ascend, sending glowing embers into the sky and forging servant leaders.',
    atmosphericTransition:
      'The holy fire blazes along the shoreline, illuminating the sand and waters with divine radiance.',
    theologyTheme: 'Equipped by the flame of the Holy Spirit. Leaders forged in refiner’s fire as living beacons.',
    accentColor: '#C1683B', // Terracotta Fire
    defaultMediaUrl: '/videos/act3_leadership.mp4',
  },
  {
    order: 4,
    chapterKey: 'mission',
    actRoman: 'Act IV',
    pillarName: 'Pillar IV • Mission',
    headline: 'Go therefore and make disciples of all the nations',
    subheadline:
      'Following Jesus into the nations. As the Holy Fire illuminates the shoreline, disciples walk directly in the footsteps of Christ, taking the gospel of peace to the ends of the earth.',
    scriptureRef: 'Romans 10:15 & Matthew 28:19–20',
    scriptureText:
      'How beautiful are the feet of those who bring good news!... Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
    visualDescription:
      'A trail of purposeful footsteps in golden sand leading toward a sunrise horizon with two silhouettes, walking in the footsteps of Christ to reach the nations.',
    atmosphericTransition:
      'Seamless landing into service times, venue map, and connection portal.',
    theologyTheme: 'Following Jesus into the nations. Walking in the footsteps of Christ with the gospel of peace.',
    accentColor: '#E3A857', // Sunrise Gold
    defaultMediaUrl: '/videos/act4_mission.mp4',
  },
]

/**
 * Merge CMS StoryChapter documents with canonical metadata defaults so
 * any editable field in Payload overrides defaults while preserving rich visual cues.
 */
export function mergeWithCanonical(cmsChapters: StoryChapter[]): (StoryActMeta & { backgroundMediaUrl: string })[] {
  return CANONICAL_ACTS.map((canonical) => {
    const matched = cmsChapters.find(
      (c) => c.chapterKey === canonical.chapterKey || c.order === canonical.order
    )
    if (!matched) {
      return {
        ...canonical,
        backgroundMediaUrl: canonical.defaultMediaUrl,
      }
    }

    const cmsMediaUrl =
      matched.backgroundMedia && typeof matched.backgroundMedia === 'object' && 'url' in matched.backgroundMedia
        ? (matched.backgroundMedia as { url?: string }).url
        : undefined

    return {
      ...canonical,
      order: matched.order ?? canonical.order,
      chapterKey: matched.chapterKey ?? canonical.chapterKey,
      pillarName: matched.pillarName || canonical.pillarName,
      headline: matched.headline || canonical.headline,
      subheadline: matched.subheadline || canonical.subheadline,
      scriptureRef: matched.scriptureRef || canonical.scriptureRef,
      scriptureText: matched.scriptureText || canonical.scriptureText,
      backgroundMediaUrl: cmsMediaUrl || canonical.defaultMediaUrl,
    }
  })
}
