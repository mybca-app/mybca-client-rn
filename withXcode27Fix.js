const { withDangerousMod, withPlugins } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withPodfileDeploymentTargetFix = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.projectRoot, 'ios', 'Podfile');
      let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

      // The block of code we want to inject into the Podfile
      const targetOverrideCode = `
    # FORCED XCODE 27 DEPLOYMENT TARGET FIX FOR ALL BUNDLES
    installer.generated_projects.each do |project|
      project.targets.each do |target|
        target.build_configurations.each do |config|
          if config.build_settings['IPHONEOS_DEPLOYMENT_TARGET']
            current_target = config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f
            if current_target < 16.4
              config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '16.4'
            end
          end
        end
      end
    end
`;

      // Find the post_install block and append our override rule right before the end
      if (podfileContent.includes('post_install do |installer|')) {
        // Prevent duplicate injections if prebuild runs repeatedly without --clean
        if (!podfileContent.includes('FORCED XCODE 27 DEPLOYMENT TARGET FIX')) {
          podfileContent = podfileContent.replace(
            'post_install do |installer|',
            `post_install do |installer|${targetOverrideCode}`
          );
          fs.writeFileSync(podfilePath, podfileContent, 'utf-8');
        }
      } else {
        console.warn("Could not find post_install block in Podfile to apply Xcode 27 fix.");
      }

      return config;
    },
  ]);
};

module.exports = (config) => withPlugins(config, [withPodfileDeploymentTargetFix]);
