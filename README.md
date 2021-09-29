# iZotope Compare Web Widget

Built with React, `izocompare` is a micro web app used to play up to 3 audio files with one synchronized playhead. Designed to be used inside an iframe, `izocompare` is designed to be fully responsive and resizable, but optimized around 300-500px window width.

|                 Dark Theme                 |                 Light Theme                  |                 Video                  |
| :----------------------------------------: | :------------------------------------------: | :------------------------------------: |
| ![Preview - Dark Theme](/preview_dark.png) | ![Preview - Light Theme](/preview_light.png) | ![Preview - Video](/preview_video.gif) |

## Available Paramaters

Because of its intended iframe use case, all parameters can be passed into `izocompare` as URL query parameters. All parameters should be properly encoded to be used in a URL.

- `src1`: _encoded url, required_ - defines the source of the first audio source.
- `src2`: _encoded url, required_ - defines the source of the second audio source.
- `src3`: _encoded url, optional_ - defines the source of the optional third audio source.
- `label1`: _string, optional_ - defines a custom label for the first audio source, defaults to "Original"
- `label2`: _string, optional_ - defines a custom label for the second audio source, defaults to "RX8" `src3` is populated, or "Processed" if not
- `label3`: _string, optional_ - defines a custom label for the first audio source, defaults to "RX9"
- `theme`: _enum, optional_ - defines UI color theme, either "dark" or "light", defaults to "light"

## Example URL Structure

Assuming a local testing environment with a root URL of `localhost:3000`, a fully structured URL is provided below:

`http://localhost:3000/?theme=light&src1=https%3A%2F%2Fwww.soundhelix.com%2Fexamples%2Fmp3%2FSoundHelix-Song-1.mp3&src2=https%3A%2F%2Fwww.soundhelix.com%2Fexamples%2Fmp3%2FSoundHelix-Song-2.mp3&src3=https%3A%2F%2Fwww.soundhelix.com%2Fexamples%2Fmp3%2FSoundHelix-Song-3.mp3&label3=Custom%20Label`
