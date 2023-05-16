import chalk from 'chalk'
import path from 'path'

// Replaces all whitespace with dashes and URI encodes the rest
export function pathToSlug(fp: string) {
  const { dir, name } = path.parse(fp)
  const cleanedPath = path.join(dir, name)
  return encodeURI(cleanedPath.replace(/\s/g, '-'))
}

export async function logPromise<T>(verbose: boolean, p: Promise<T>, msg: string): Promise<T> {
  if (!verbose) {
    return p
  }

  process.stdout.write(chalk.grey(`  ${msg} ... `))
  return p
    .then((res) => {
      process.stdout.write(chalk.green("ok"))
      return res
    })
    .catch((res) => {
      process.stdout.write(chalk.red("err: ") + res.toString())
      return res
    })
    .finally(() => process.stdout.write("\n"))
}

