import * as fs from 'fs'
import { promises as asyncFs } from 'fs'
import { Adapter } from '../../../abstracts/Adapter/Adapter'
import { NodeMeta, FileMeta } from '../../../interfaces/Adapter'
import { NodeType } from '../../../types/NodeType'
import * as FileType from 'file-type'
import * as fse from 'fs-extra'
import { file as TmpFile } from 'tmp-promise'
import { DirectoryMeta } from '../../../interfaces/Adapter/DirectoryMeta'

/*
 * LocalAdapter class.
 */
export class LocalAdapter extends Adapter {
  /**
   * Check whether a file or directory.
   * @param path Path to file or directory.
   */
  async has(path: string) {
    const fullPath = this.resolve(path)
    const result = await asyncFs
      .access(fullPath)
      .then(() => true)
      .catch(() => false)

    return result
  }

  /**
   * Read a file.
   *
   * @param path Path to file.
   */
  async read(path: string) {
    const fullPath = this.resolve(path)
    const buffer = await asyncFs.readFile(fullPath)

    return buffer.toString()
  }

  /**
   * Read a file using a stream.
   *
   * @param path Path to file.
   */
  readStream(path: string) {
    const fullPath = this.resolve(path)

    return fs.createReadStream(fullPath)
  }

  /**
   * List children of the directory.
   *
   * @param path Path to directory.
   */
  async listChildren(path: string) {
    const fullPath = this.resolve(path)
    const dirents = await asyncFs.readdir(fullPath, {
      withFileTypes: true,
    })

    return dirents.map((dirent) =>
      this.makeNodeMetaFromDirent(fullPath, dirent)
    )
  }

  /**
   * Get size of the file or directory.
   *
   * @param path Path to file or directory.
   */
  async getSize(path: string) {
    const fullPath = this.resolve(path)
    const stat = await this.getStat(fullPath)

    return stat.size
  }

  /**
   * Get MIME type of the file.
   *
   * @param path Path to file.
   */
  async getMime(path: string) {
    const fullPath = this.resolve(path)
    const fileType = await FileType.fromFile(fullPath)

    return fileType?.mime || false
  }

  /**
   * Write a new file.
   *
   * @param path Path to file.
   * @param contents Write contents.
   */
  async write(path: string, contents: string) {
    const fullPath = this.resolve(path)

    await asyncFs.writeFile(fullPath, contents)

    const nodeMeta: FileMeta = {
      path: fullPath,
      type: NodeType.File,
    }

    return nodeMeta
  }

  /**
   * Write a new file using a stream.
   *
   * @param path Path to file.
   */
  writeStream(path: string) {
    const fullPath = this.resolve(path)
    const stream = fs.createWriteStream(fullPath)

    return stream
  }

  /**
   * Update a new file.
   *
   * @param path Path to file.
   * @param contents Update contents.
   */
  async update(path: string, contents: string) {
    const fullPath = this.resolve(path)

    await asyncFs.writeFile(fullPath, contents)

    const nodeMeta: FileMeta = {
      path: fullPath,
      type: NodeType.File,
    }

    return nodeMeta
  }

  /**
   * Write a new file using a stream.
   *
   * @param path Path to file.
   */
  updateStream(path: string) {
    const fullPath = this.resolve(path)
    const stream = fs.createWriteStream(fullPath)

    return stream
  }

  /**
   * Create or Update a file.
   *
   * @param path Path to file.
   * @param contents Put contents.
   */
  async put(path: string, contents: string) {
    const fullPath = this.resolve(path)

    await asyncFs.writeFile(fullPath, contents)

    const nodeMeta: FileMeta = {
      path: fullPath,
      type: NodeType.File,
    }

    return nodeMeta
  }

  /**
   * Create or Update a file using a stream.
   *
   * @param path Path to file.
   */
  putStream(path: string) {
    const fullPath = this.resolve(path)
    const stream = fs.createWriteStream(fullPath)

    return stream
  }

  /**
   * Append a contents to a file.
   *
   * @param path Path to file.
   * @param contents Append contents.
   */
  async append(path: string, contents: string) {
    const fullPath = this.resolve(path)
    await asyncFs.appendFile(fullPath, contents)

    const nodeMeta: FileMeta = {
      path: fullPath,
      type: NodeType.File,
    }

    return nodeMeta
  }

  /**
   * Prepend a contents to a file.
   *
   * @param path Path to file.
   * @param contents Prepend contents.
   */
  async prepend(path: string, contents: string) {
    const fullPath = this.resolve(path)
    const { path: tempFilePath, cleanup } = await TmpFile()

    return new Promise<FileMeta></FileMeta>((resolve, reject) => {
      fs.writeFile(tempFilePath, contents, function (err) {
        if (err) {
          reject(err)
          return
        }

        fs.createReadStream(fullPath)
          .on('error', function (err) {
            reject(err)
          })
          .pipe(
            fs.createWriteStream(tempFilePath, {
              flags: 'a',
            })
          )
          .on('error', function (err) {
            reject(err)
          })
          .on('finish', function () {
            fs.createReadStream(tempFilePath)
              .on('error', function (err) {
                reject(err)
              })
              .pipe(fs.createWriteStream(fullPath))
              .on('error', function (err) {
                reject(err)
              })
              .on('finish', function () {
                cleanup()
                resolve({
                  path: fullPath,
                  type: NodeType.File,
                })
              })
          })
      })
    })
  }

  /**
   * Move a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Move destination path.
   */
  async move(path: string, newPath: string) {
    const fullPath = this.resolve(path)
    const newFullPath = this.resolve(newPath)
    await asyncFs.rename(fullPath, newFullPath)

    const nodeMeta: NodeMeta = {
      path: newFullPath,
      type: NodeType.Unknown,
    }

    return nodeMeta
  }

  /**
   * Copy a file or directory.
   *
   * @param path Path to the file or directory.
   * @param newPath Copy destination path.
   */
  async copy(path: string, newPath: string) {
    const fullPath = this.resolve(path)
    const newFullPath = this.resolve(newPath)
    await fse.copy(fullPath, newFullPath)

    const nodeMeta: NodeMeta = {
      path: newFullPath,
      type: NodeType.Unknown,
    }

    return nodeMeta
  }

  /**
   * Delete a file or directory.
   *
   * @param path Path to file or directory.
   */
  async delete(path: string) {
    const fullPath = this.resolve(path)

    await fse.remove(fullPath)
  }

  /**
   * Make directory.
   *
   * @param path Path to directory.
   */
  async makeDirectory(path: string) {
    const fullPath = this.resolve(path)

    await fse.mkdirs(fullPath)

    const nodeMeta: DirectoryMeta = {
      path: fullPath,
      type: NodeType.Directory,
    }

    return nodeMeta
  }

  /**
   * Get stat.
   *
   * @param path Path to file.
   */
  private async getStat(path: string) {
    const stat = await asyncFs.stat(path)

    return stat
  }

  /**
   * Make `NodeMeta` from a `Dirent` object.
   *
   * @param path Path.
   * @param dirent Dirent.
   */
  private makeNodeMetaFromDirent(path: string, dirent: fs.Dirent) {
    const type = dirent.isFile()
      ? NodeType.File
      : dirent.isDirectory()
      ? NodeType.Directory
      : NodeType.Unknown

    const nodeMeta: NodeMeta = {
      path: this.resolve(path, dirent.name),
      type,
    }

    return nodeMeta
  }
}
