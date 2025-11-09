import { readFileSync } from 'fs'
import { extname } from 'path'
import { transformWithEsbuild } from 'vite'

export default function svgFnPlugin() {
	return {
		name: 'vite-plugin-svg-function',
		transform(src, id) {
			if (extname(id) === '.svg') {
				const svgContent = readFileSync(id, 'utf-8')
					// Remove comments
					.replace(/<\?.*\?>/g, '')
					.replace(/<!--.*-->/g, '')
					// apply props to svg tag
					.replace(/<svg([^>]*)>/, '<svg$1 {...props}>')
					.trim()
				return transformWithEsbuild(
					`
          export default function(props) { 
            return (
              ${svgContent}
            )
          }`,
					id + '.jsx',
					{
						jsx: 'automatic',
						jsxImportSource: 'pota', // Specify pota as the JSX import source
					},
				)
			}
		},
	}
}
