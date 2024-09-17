import { Animation, AnimationController } from '@ionic/angular';

export function customTabAnimation(AnimationC: AnimationController, baseEl: HTMLElement): Animation {
  const rootTransition = AnimationC.create()
    .addElement(baseEl)
    .duration(300) // Set the duration of the transition
    .easing('ease-out') // Define the easing function for smoothness
    .fromTo('opacity', 0, 1); // Fade-in effect

  return rootTransition;
}
