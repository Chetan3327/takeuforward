import React from 'react'

const Submissions = () => {
  const data = [
    {
        username: 'user1',
        codeLanguage: 'JavaScript',
        stdin: 'input data 1',
        timestamp: '2024-03-19T10:15:30Z',
        sourceCode: 'function helloWorld() { console.log("Hello, world!"); }'
    },
    {
        username: 'user2',
        codeLanguage: 'Python',
        stdin: 'input data 2',
        timestamp: '2024-03-19T11:20:45Z',
        sourceCode: 'def hello_world():\n    print("Hello, world!")'
    },
    {
        username: 'user3',
        codeLanguage: 'Java',
        stdin: 'input data 3',
        timestamp: '2024-03-19T12:25:15Z',
        sourceCode: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}'
    }
  ];
  return (
    <div className='flex min-h-screen p-5 gap-5'>
      <div className='flex bg-secondary rounded-md w-full shadow-lg'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                            CodeLanguage
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Stdin
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Timestamp
                        </th>
                        <th scope="col" class="px-6 py-3">
                            SourceCode
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return <tr class="odd:bg-white odd:dark:bg-[#333] even:bg-gray-50 even:dark:bg-secondary border-b dark:border-secondary">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.username}
                      </th>
                      <td class="px-6 py-4">
                          {item.codeLanguage}
                      </td>
                      <td class="px-6 py-4">
                          {item.stdin}
                      </td>
                      <td class="px-6 py-4">
                          {item.timestamp}
                      </td>
                      <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                      </td>
                    </tr>
                  })}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Submissions
