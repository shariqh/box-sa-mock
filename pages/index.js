import {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import WarningPopover from "../components/WarningPopover"
import {getCurrentUser, getFilesInFolder} from "../lib/box"

const people = [
  {name: 'Wade Cooper', email: 'wadeinwater@test.com'},
  {name: 'Arlene Mccoy', email: 'whysomccoy@test.com'},
  {name: 'Shariq Hirani', email: 'shariqhirani2010@gmail.com'},
  {name: 'Devon Webb', email: 'webbedfeet@test.com'},
  {name: 'Tom Cook', email: 'notthegreatestcook@test.com'},
  {name: 'Tanya Fox', email: 'slyasafox@test.com'},
  {name: 'Hellen Schmidt', email: 'welcometohellen@test.com'},
]

export default function Home({name, files}) {
  const [selected, setSelected] = useState(people[0])
  const [emailConfirmed, setEmailConfirmed] = useState()

  const newSelect = (selected) => {
    setSelected(selected)
    setEmailConfirmed(false)
  }

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-300 min-h-screen">
      <div className="mx-auto max-w-lg">
        <p className="text-lg pt-8">Welcome, <span className="font-semibold">{name}</span></p>
        <p className="text-2xl font-bold">Leading Healthcare Provider</p>
        <p className="text-xl font-semibold">Patient Form Portal</p>
        <p className="pl-2 pt-4">Select patient from EMR</p>
        <div className="w-full">
          <Listbox value={selected} onChange={(selected) => {
            newSelect(selected)
          }}>
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({active}) =>
                        `${active ? 'hover:bg-blue-200' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={person}
                    >
                      {({selected, active}) => (
                        <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {person.name}
                      </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-amber-600' : 'text-amber-600'
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                          <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                        </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {selected &&
        <>
          <p className="pl-2 pt-2">Patient email on file</p>
          <p className="bg-gray-200 shadow-md uppercase p-2 rounded-lg tracking-wider">{selected.email}</p>
          <div className="justify-center space-x-4 flex">
            <button className="my-4 px-3 py-2 border border-black rounded-md font-medium bg-white hover:bg-blue-400"
                    onClick={() => setEmailConfirmed(true)}>
              confirm
            </button>
            <WarningPopover/>
          </div>
        </>
        }
        {emailConfirmed &&
        <div className="flex flex-col mx-auto">
          <p>Upload {files.total_count} forms and send to patient?</p>
          {files.entries.map((f) => {
            return <p>{f.name}</p>
          })}
          <button
            className="justify-center my-2 py-2 border border-white rounded-md font-medium bg-red-500 text-white font-bold hover:bg-red-600"
            onClick={() => {
              createAndShareFolder(selected.name)
              console.log("send")
            }}>
            share forms
          </button>
        </div>
        }
      </div>
    </div>
  )
}

async function createAndShareFolder(folderName) {
  const createFolderResponse = await fetch("/api/box", {
    method: 'POST',
    body: folderName
  })

  const { id } = await createFolderResponse.json()

  console.log(id)

}

export async function getStaticProps() {
  const {name} = await getCurrentUser();
  const files = await getFilesInFolder();

  return {
    props: {
      name,
      files,
    },
  };
}
