// 11. Модульность и библиотеки
// 11.2 Namespaces и reference

namespace A {
    export const s = 5;

    export interface B {
        id: number;
    }
}

class B {

}

export {A, B}